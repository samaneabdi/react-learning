import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hook";

const HeaderBadge = () =>{
    const navigate = useNavigate();

    // const selectedProducts = useSelector(state => state.productSlice.selectedProducts);
    const selectedProducts = useAppSelector((state) => state.productSlice.selectedProducts);
    const totalSelectedProducts = selectedProducts.reduce((total, item) => total + item.quantity, 0);
    return (
        <Badge size="small" count={totalSelectedProducts}>
        <ShoppingCartOutlined rev={"shopCart"} onClick={() => navigate("/ProductBasket")} className="btnIcon"/>
      </Badge>
    )
}
export default HeaderBadge;