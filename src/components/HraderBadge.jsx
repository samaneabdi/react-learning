import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { productStore } from "../store/productStore";


const HeaderBadge = () =>{
    const navigate = useNavigate();
    const store = useContext(productStore);
    const totalSelectedProducts = store.selectedProducts.reduce((total, item) => total + item.quantity, 0);
    return (
        <Badge size="small" count={totalSelectedProducts}>
        <ShoppingCartOutlined onClick={() => navigate("/ProductBasket")} className="btnIcon"/>
      </Badge>
    )
}
export default HeaderBadge;