//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CyceStake.sol";

interface IERC20 {

    function decimals() external view returns(uint256);

    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}



/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */

abstract contract Context{

    function _msgSender() internal virtual view returns(address){
        return msg.sender;
    }


    function _msgData() internal virtual view returns(bytes memory){
        this;
        return msg.data;
    }

}
abstract contract Ownable is Context{
    address owner;
    constructor(){
        owner = _msgSender();
    }


    /**
     * @dev Returns the address of the current owner.
     */
    function _onlyOwner() internal view{
        require(owner == _msgSender(), "unauthorized");
    }

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }
    /*function transferOwnerShip(address newOwner) public onlyOwner {
        owner = newOwner;
    }*/

    /* function changeContractAddres(address _newAddress) public  onlyOwner{
      cyce = _newAddress;
  }*/
}

abstract contract Pausable is Ownable{
    event Paused();
    event Unpaused();
    bool public paused = false;

    modifier whenPaused() {
        require(paused);
        _;
    }
    modifier whenNotPaused(){
        require(!paused, "paused");
        _;
    }
    function pause() onlyOwner whenNotPaused external {
        paused = true;
        emit Paused();
    }
    function unpause() onlyOwner whenPaused external {
        paused = false;
        emit Unpaused();
    }

}
contract StakeCyce is Pausable{

    struct Investor {
        uint balance;
        uint time;
        uint percent;
    }
    struct InvestorStorage {
        Investor[] investors;
    }
    mapping(address => InvestorStorage)  investments;


    IERC20 token;
    uint _totalReserve;
    event ReserveToken(address account, uint amount, uint time, uint percent);
    event Withdraw(address account, uint amount, uint time, uint percent);
    constructor() {
        token = 0x9bF88fAe8CF8BaB76041c1db6467E7b37b977dD7;
    }


    function transferFrom(address account,  uint day, uint percent) public onlyOwner{
        uint _amount = token.allowance(account, address(this));
        require(_amount > 0, "allowance 0");
        bool isTransfer = token.transferFrom(account, address(this), _amount);
        require(isTransfer, "transfer not worked");
        reserve(account, _amount, day, percent);
    }

    function apporove(address spender, uint amount) public {
        token.approve(spender, amount);
    }
    function reserve(address  account, uint amount, uint day, uint percent) public  onlyOwner{
        require(amount > 0, "amount 0");
        // require(day > 0, "day 0");
        require(percent % 10 == 0 , "must be a multiple of 10");
        Investor memory _investor;
        uint _time      = block.timestamp + day * 1 days;
        uint _percent   = percent / 10;
        require(contractERC20Balance() >= _totalReserve + amount + amount / 10 * _percent, "insufficient balance");
        _investor.balance    = amount;
        _investor.time       = _time;
        _investor.percent    = _percent;
        investments[account].investors.push(_investor);
        _totalReserve += amount + amount / 10 * _percent;
        emit ReserveToken(account, amount, _time, _percent);
    }
    function withdraw(address account, uint index) public whenNotPaused {
        Investor memory _investor;
        _investor = investments[account].investors[index];
        uint arrayLength =  investments[account].investors.length;

        require(_investor.balance > 0,
            "balance must be greater than 0");
        require(arrayLength > 0,
            "array is empty");
        require(_investor.time < block.timestamp,
            "time has not expired");

        uint _totalPercent = _investor.balance / 10 * _investor.percent;
        uint _amount = _investor.balance + _totalPercent;

        remove(account, index);

        _totalReserve -= _amount;
        token.transfer(account, _amount);
        emit Withdraw(account, _amount, index, block.timestamp);
    }

    function remove(address account, uint index) internal {
        uint arrayLength =  investments[account].investors.length;
        investments[account].investors[index] = investments[account].investors[arrayLength-1];
        investments[account].investors.pop();
    }
    function getInvestorInfo(address account) public view
    returns(
        uint[] memory balances,
        uint[] memory times,
        uint[] memory percents
    ){
        uint _lenght = investments[account].investors.length;
        uint[] memory _balances = new uint[](_lenght);
        uint[] memory _times= new uint[](_lenght);
        uint[] memory _percents = new uint[](_lenght);
        for(uint i = 0; i < _lenght; i++){
            _balances[i] = investments[account].investors[i].balance;
            _times[i]  =   investments[account].investors[i].time;
            _percents[i]  = investments[account].investors[i].percent;
        }
        return (_balances, _times, _percents);
    }
    function withdrawAll() external onlyOwner returns(bool){
        uint totalBalance =  token.balanceOf(address(this)) - _totalReserve;
        require(totalBalance > 0, "empty");
        token.transfer(_msgSender(), totalBalance);
        return true;
    }
    function contractERC20Balance() public view returns(uint){
        uint _balance = token.balanceOf(address(this));
        return _balance;
    }

    function removeInvestList(address account, uint index) public {
        remove(account, index);
    }
    function balanceERC20(address account) public view returns(uint){
        return token.balanceOf(account);
    }
    function totalReserve() public view returns(uint){
        return _totalReserve;
    }
    function balanceOf(address _account) public view returns(uint){
        uint _balance;
        for(uint i = 0; i < investments[_account].investors.length; i++)
        {
            _balance += investments[_account].investors[i].balance +
            investments[_account].investors[i].balance / 10 *
            investments[_account].investors[i].percent ;
        }
        return _balance;
    }

}