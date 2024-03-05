import { useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar"
import "./navbar.scss"
import { motion } from "framer-motion"

function formatTitle(pathname) {
  if (pathname === "/") {
    return "Browei's Homepage"; // 特殊情况：根路径
  }

  const pathSegments = pathname.split("/").filter(Boolean); // 移除空字符串，比如在路径两端
  return pathSegments.map(segment => {
    // 将每个段的首字母大写，其余字母小写
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }).join(" "); // 将处理过的各段重新组合为一个字符串
}

const Navbar = () => {
  const location = useLocation(); // 获取当前路径信息
  const title = formatTitle(location.pathname);
  return (
    <div className="navbar">
      <Sidebar/>
      <div className="wrapper">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.span>
        <div className="social">
          <a href="#"><img src="/bilibili_com.png" alt="" /></a>
          <a href="#"><img src="/youtube.png" alt="" /></a>
        </div>
      </div>
    </div>
  )
}

export default Navbar