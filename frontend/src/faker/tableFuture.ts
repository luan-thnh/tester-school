import ChartFill from "@/assets/svgs/chart_fill.svg";
import IconFilleDocAdd from "@/assets/svgs/file_dock_add_fill.svg";
import FileDocFill from "@/assets/svgs/file_dock_fill.svg";
import LineUp from "@/assets/svgs/line_up.svg";
import PaperFill from "@/assets/svgs/paper_fill.svg";
import UserCircle from "@/assets/svgs/user_cicrle.svg";
import Database from "@/assets/svgs/database_fill.svg";
import TagPercent from "@/assets/svgs/offer_Percent.svg";
import FileCheck from "@/assets/svgs/file_Tick.svg";
import Box3d from "@/assets/svgs/3d_box.svg";
import UserAdd from "@/assets/svgs/user_add_alt_fill.svg";
import GroupUser from "@/assets/svgs/manage_user_group.svg";
import ProductUser from "@/assets/svgs/product_User.svg";
import ChevronDown from "@/assets/svgs/Expand_down.svg";
interface NavbarProps {
    id: number;
    prefixIcon?: any;
    leadingIcon?: any;
    title: string;
    href: string;
    subMenu?: NavbarProps[];
}
const tableFuture: NavbarProps[] = [
    {
        id: 1,
        prefixIcon: IconFilleDocAdd,
        title: "Create Sales Order",
        href: "/home"
    },
    {
        id: 2,
        prefixIcon: FileDocFill,
        title: "Sales Order Management",
        href: "#"
    },
    {
        id: 3,
        prefixIcon: GroupUser,
        title: "Customer Management",
        href: "#"
    },
    {
        id: 4,
        prefixIcon: UserCircle,
        title: "Employee Management",
        href: "#"
    },
    {
        id: 5,
        prefixIcon: LineUp,
        title: "Price index & Policy",
        href: "#"
    },
    {
        id: 6,
        prefixIcon: ChartFill,
        title: "Domestic Sales Management",
        href: "#"
    },
    {
        id: 7,
        prefixIcon: PaperFill,
        title: "Debt Management",
        href: "#"
    },
    {
        id: 8,
        prefixIcon: ProductUser,
        title: "Production Management",
        href: "#"
    },
    {
        id: 9,
        prefixIcon: Box3d,
        title: "Inventory Management    ",
        href: "#"
    },
    {
        id: 10,
        prefixIcon: UserAdd,
        title: "Other Department Management",
        href: "#"
    },
    {
        id: 11,
        prefixIcon: FileCheck,
        title: "Order Approvals",
        href: "#"
    },
    {
        id: 12,
        prefixIcon: Database,
        title: "Data Configuration",
        href: "#"
    },
    {
        id: 13,
        prefixIcon: TagPercent,
        title: "Discount Management",
        href: "#"
    }
];

export default tableFuture;
