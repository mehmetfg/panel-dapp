import {Link} from "react-router-dom";

const Home = () => {

    return(
    <>
    <div className="card-header">
        <h5>Bayiler</h5>
        <h1 className="pull-right">
            <Link to={"/dealers/create"} className="btn btn-primary pull-right">Yeni Ekle</Link>

        </h1>
    </div>
    <div className="card-body">
        <div className="dt-ext table-responsive">
            <table  className="display dt-responsive" id="responsive"><thead><tr><th  title="Id">Id</th><th  title="Adı">Adı</th><th  title="Email">Email</th><th  title="Telefon">Telefon</th><th  title="Vergi Numarası">Vergi Numarası</th><th  title="Yetkili Adı">Yetkili Adı</th><th  title="Web Adresi">Web Adresi</th><th  title="Aksiyon" width="auto">Aksiyon</th></tr></thead></table>
        </div>
    </div>
    <div class="card-footer">

    </div>
</>
    )



}
export  default Home;