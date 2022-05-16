import Pages from "./pages/Pages";
import Category from "./components/Category";
import {Link, BrowserRouter} from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import {GiKnifeFork} from "react-icons/gi";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav to='/'>
                    <GiKnifeFork />
                    <Logo /> Delicious
                </Nav>
                <Search/>
                <Category/>
                <Pages/>
            </BrowserRouter>
        </div>
    );
}

const Logo = styled.div`
  text-decoration: none;
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Nav = styled(Link)`
    padding:4rem 0;
  display: flex;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  svg{
    margin-right: 1rem;
  }
`;

export default App;
