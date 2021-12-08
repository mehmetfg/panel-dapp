//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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
        require(owner == _msgSender());
    }

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }
    /*function transferOwnerShip(address newOwner) public onlyOwner {
        owner = newOwner;
    }*/

    /* function changeContractAddres(address _newAddress) public {
      cyce = _newAddress;
  }*/
}
contract StakeCyce is Ownable{
    struct Insvester {
        uint[] balance;
        uint[] time;
        uint[] percent;

    }

    mapping(address => Insvester)  investments;

    /*  mapping(address => uint) balances;
      mapping (address => uint) time; */
    address cyce;
    uint totalReserve;
    constructor() {
        //0xEaDD9B69F96140283F9fF75DA5FD33bcF54E6296
        cyce = 0x978662dAa87464B9B7FF6ac8595292F41b76dd41;
    }
    function setStakeToInvester(address  _account, uint _amount, uint _day, uint _percent) public {

        investments[_account].percent.push(_percent);
        investments[_account].balance.push(_amount);
        investments[_account].time.push(block.timestamp + _day * 1 days);
        // investments[_account].index = investments[_account].balance.length;
        totalReserve += _amount + _amount / 10 * _percent;
    }
    function withdrawDistrubuted(address _account, uint i) public {
        require(investments[_account].balance.length > 0, "index 0 olmamali");

        uint _amount;
        if(investments[_account].time[i] <= block.timestamp){
            _amount = investments[_account].balance[i] + investments[_account].balance[i] / 10 * investments[_account].percent[i];

            investments[_account].balance[i] = 0;
            investments[_account].percent[i] = 0;
            investments[_account].time[i] = 0;
            //investments[_account].index--;
        }


        totalReserve -= _amount;
        IERC20(cyce).transfer(_account, _amount);
    }



    function removeInvestList(address _account) public {
        delete investments[_account];
    }

    /*
        function withdrawDistrubuted(address _account, uint _index) public {
         require(investments[_account].index != 0, "index 0 olmamali");
            uint _amount;
         for(uint8 i = 0; i < investments[_account].balance.length; i += 1){
             if(investments[_account].time[i] <= block.timestamp){
                  uint _total =investments[_account].balance[i] + investments[_account].balance[i] / 10 * investments[_account].percent[i];

                   investments[_account].balance[i] = 0;
                   investments[_account].percent[i] = 0;
                   investments[_account].time[i] = 0;
                   investments[_account].index--;
             }
         }

         totalReserve -= _amount;
         IERC20(cyce).transfer(_account, _amount);
     }

    function getAmount(Insvester storage _invest) public  returns(uint){

         return _amount;
     }*/




    function getTokenBalance() public view returns(uint){

        return IERC20(cyce).balanceOf(_msgSender());
    }
    function getBalances(address _account) public view returns(uint[] memory){
        uint[] memory  _arr256 = new uint[](5);
        for (uint i = 0; i < investments[_account].balance.length; i++) {
            _arr256[i] = uint256(investments[_account].balance[i]);
        }
        return _arr256;
    }
    function getInvesterInfo(address _account) public view returns(uint[] memory _balances, uint[] memory _times, uint[] memory _percents){
        return (investments[_account].balance, investments[_account].time, investments[_account].percent);
    }
    /*  function balanceOf(address account) external view returns(uint){
          return balances[account];
      }
      function lockTime(address account) external view returns(uint){
          return time[account];
      }
      function setDeposite(address account, uint amount, uint8 _day) external onlyOwner returns(bool)  {
          require(contractERC20Balance() >= amount + totalReserve);
          balances[account] = amount;
          time[account] = block.timestamp + _day * 1 days ;
          return true;
      }
      function withdraw() external  returns(bool){
          require(balances[_msgSender()] > 0);
         // require(time[_msgSender()] <= block.timestamp);
          uint _amount=balanceCalclute();
          balances[_msgSender()] = 0;
          IERC20(cyce).transfer(msg.sender, _amount);
          return true;
      }*/
    function balanceCalcluteT(Insvester memory _invest, uint8 _index) public pure returns(uint){

    }
    /* function balanceCalclute()  public view returns(uint){
         return balances[_msgSender()] + balances[_msgSender()] / 10 * 3;
     }*/
    function withdrawAll() external onlyOwner returns(bool){
        uint totalBalance =  IERC20(cyce).balanceOf(address(this)) - totalReserve;
        require(totalBalance > 0, "hesap bos");
        IERC20(cyce).transfer(_msgSender(), totalBalance);
        return true;
    }
    function contractERC20Balance() public view returns(uint){
        uint _balance = IERC20(cyce).balanceOf(address(this));
        return _balance;
    }


}