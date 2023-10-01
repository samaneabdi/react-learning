import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useObserver } from "mobx-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { productStore } from "../store/productStore";


const HeaderBadge = () =>{
    const navigate = useNavigate();
    const store = useContext(productStore);
    return useObserver(() => (
      <Badge size="small" count={store!.totalSelectedProducts}>
        <ShoppingCartOutlined rev={"shopCart"} onClick={() => navigate("/ProductBasket")} className="btnIcon"/>
      </Badge>
    ))
}
export default HeaderBadge;