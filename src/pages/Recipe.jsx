import React from "react";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {motion} from "framer-motion";

function Recipe(props) {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () => {

        const check = localStorage.getItem(params.id);

        if(check){
            setDetails(JSON.parse(check));
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
            const detailData = await data.json();
            localStorage.setItem(params.id, JSON.stringify(detailData));
            setDetails(detailData);
            console.log(detailData);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [params.id]);

    return (
        <DetailWrapper
            animate={{opacity:1}}
            initial={{opacity:0}}
            exit={{opacity:0}}
            transition={{duration:0.5}}
        >
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} />
            </div>
            <Info>
                <div>
                    <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => {setActiveTab('instructions')}}>Instructions</Button>
                    <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => {setActiveTab('ingredients')}}>Ingredients</Button>
                </div>
                {activeTab === 'instructions' && (
                    <div>
                        <p>{details.summary}</p>
                        <p>{details.instructions}</p>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled(motion.div)`
  margin-top: 2rem;
  margin-bottom: 5rem;
  img{
    width: 100%;
    border-radius: 2rem;
  }
  p{
    margin-bottom: 1rem;
  }
  .active{
    color:white;
    background: linear-gradient(35deg, #494949, #313131);
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }
`;

const Button = styled.div`
    padding: 1rem 2rem;
  text-align: center;
  display: inline-block;
  width: calc(50% - 1rem);
  margin:.5rem;
  color: #313131;
  background-color: white;
  border:2px solid black;
  font-weight: 600;
`;

const Info = styled.div`
`;

export default Recipe;