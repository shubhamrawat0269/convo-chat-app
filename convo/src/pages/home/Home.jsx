import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-3xl font-bold underline">
      Home Page
      {/* Message component  */}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
