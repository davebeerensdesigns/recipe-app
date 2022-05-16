import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";

function Cuisine(props) {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    useEffect(() => {
        async function getCuisine(name) {

            const check = localStorage.getItem(name);

            if(check){
                setCuisine(JSON.parse(check));
            } else {
                const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&cuisine=${name}`);
                const data = await api.json();
                localStorage.setItem(name, JSON.stringify(data.recipes));
                setCuisine(data.recipes);
            }
        }
        if(params.type) {
            getCuisine(params.type);
        }
    }, [params.type]);

    return (
        <Grid
            animate={{opacity:1}}
            initial={{opacity:0}}
            exit={{opacity:0}}
            transition={{duration:0.5}}
        >
            {cuisine.map((item) => {
                return(
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: .5rem;
  grid-template-areas: 
    ". . ."
    ". . ."
    ". . .";
`;

const Card = styled.div`
    img{
      width: 100%;
      border-radius: 2rem;
    }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;