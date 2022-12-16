import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../App.css";
import ROUTES from "../routes/Routes";
import NotFound from "../pages/Error/NotFound";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {ROUTES.map((v) => {
            return (
              <Route key={v.path} exact path={v.path} element={v.element} />
            );
          })}
          <Route
            path="*"
            element={<NotFound id="404" message="Page Not Found" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
