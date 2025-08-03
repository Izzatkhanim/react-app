import { NavLink, Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-light vh-100 d-flex flex-column justify-content-center">
          <ul className="nav flex-column align-items-center fs-4">
            <li className="nav-item mb-3">
              <NavLink className="nav-link text-dark" to="/home/universities">
                Universities
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink className="nav-link text-dark" to="/home/schools">
                Schools
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink className="nav-link text-dark " to="/home/highschools">
                High Schools
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="col-9 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
