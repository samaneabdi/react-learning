import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeaderBadge = () =>{
    const navigate = useNavigate();

    const selectedProducts = useSelector(state => state.productSlice.selectedProducts);
    const totalSelectedProducts = selectedProducts.reduce((total, item) => total + item.quantity, 0);
    return (
        <Badge size="small" count={totalSelectedProducts}>
        <ShoppingCartOutlined onClick={() => navigate("/ProductBasket")} className="btnIcon"/>
      </Badge>
    )
}
export default HeaderBadge;