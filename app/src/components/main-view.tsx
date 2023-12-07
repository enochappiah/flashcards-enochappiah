import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar";

const MainView = () => {
  return (
    <>
      <Sidebar />
      <Feed />
      <Aside />
    </>
  );
};

export default MainView;
