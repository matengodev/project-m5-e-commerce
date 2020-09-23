import React from "react";
import styled, { keyframes, css } from "styled-components";
import { THEMES } from "../../components/THEMES";
import PageContainer from "../../components/UI/PageContainer";
import { Video } from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import {
  requestCategories,
  receiveCategories,
  receiveCategoriesError,
  requestItems,
  receiveItems,
  receiveItemsError,
} from "../../actions";
import { Link } from "react-router-dom";
import Spinner from "../../components/UI/Spinner";
import Footer from "../../components/Footer";

const HomePage = () => {
  const dispatch = useDispatch();

  const ITEMS = useSelector((state) => state.DATA.allProducts);
  const CATEGORIES = useSelector((state) => state.DATA.categories);
  const STATUS = useSelector((state) => state.DATA.status);
  // console.log(CATEGORIES);
  console.log(ITEMS);

  React.useEffect(() => {
    // This should be fetching "/items/category/:category"
    const URL = "/items/category";
    try {
      dispatch(requestCategories());
      fetch(URL)
        .then((res) => res.json())
        // .then((json) => console.log(json));
        .then((json) => dispatch(receiveCategories(json)));
    } catch (error) {
      console.log("error");
      dispatch(receiveCategoriesError());
    }
    // This should be fetching "/items"
    try {
      dispatch(requestItems());
      fetch("/items")
        .then((res) => res.json())
        // .then((json) => console.log(json));
        .then((json) => dispatch(receiveItems(json)));
    } catch (error) {
      console.log("error");
      dispatch(receiveItemsError());
    }
  }, []);

  if (STATUS === "loading" || !ITEMS || !CATEGORIES) {
    return <Spinner />;
  }
  const RandomItems = [];
  if (ITEMS.items.length > 0) {
    for (let i = 0; i < 4; i++) {
      RandomItems.push(
        ITEMS.items[Math.floor(Math.random() * ITEMS.items.length)]
      );
    }
    console.log("My Random Items", RandomItems);
  }
  return (
    <>
      <Wrapper>
        <VideoContainer>
          <VideoSrc loop autoPlay>
            <source src={Video} type="video/mp4" />
          </VideoSrc>

          <Overlay>Best Selection of Watches</Overlay>
          <Overlay2>Large Variety of Fitness Wearables</Overlay2>
          <Overlay3>Products for Pet and Animals</Overlay3>
          <Overlay4>Heart Rate Monitor</Overlay4>
        </VideoContainer>
        <Categories>Find What You Need</Categories>
        <WrapperCategories>
          <HeaderList>
            {CATEGORIES.map((cat) => {
              return (
                <Category key={cat}>
                  <StyledLink to={`/items/category/${cat}`}>
                    <span>{cat}</span>
                  </StyledLink>
                </Category>
              );
            })}
          </HeaderList>
        </WrapperCategories>

        <FeaturedTitle>Featured Products</FeaturedTitle>
        <Featured>
          {RandomItems.map((item) => {
            return (
              <Product key={item._id}>
                <StyledLink to={`/items/item/${item._id}`}>
                  <Image src={item.imageSrc}></Image>
                  <Name>{item.name}</Name>
                </StyledLink>
              </Product>
            );
          })}
        </Featured>
      </Wrapper>
    </>
  );
};

const VideoContainer = styled.div`
  background: black;
  position: relative;
`;
const VideoSrc = styled.video`
  width: 100%;
  position: relative;
  z-index: 0;
`;

const Slide = keyframes`
  from {
    transform: translateX(0px)
    opacity: 1;
  }
  to {
    transform: translateX(-500%);
    opacity: 0;
    
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 30%;
  right: 0%;
  z-index: 1;
  color: white;
  font-size: 30px;
  animation: ${Slide} 12s linear infinite;
`;

const Overlay2 = styled.div`
  position: absolute;
  top: 50%;
  right: 0%;
  z-index: 1;
  color: white;
  font-size: 30px;
  animation: ${Slide} 12s linear infinite;
`;

const Overlay3 = styled.div`
  position: absolute;
  top: 20%;
  right: 0%;
  z-index: 1;
  color: white;
  font-size: 30px;
  animation: ${Slide} 12s linear infinite;
`;

const Overlay4 = styled.div`
  position: absolute;
  top: 40%;
  right: 0%;
  z-index: 1;
  color: white;
  font-size: 30px;
  animation: ${Slide} 12s linear infinite;
`;
const Categories = styled.div`
  font-size: 30px;
  margin: 10px 65px;
  border-bottom: 1px solid lightgrey;
  padding: 5px;
`;

const WrapperCategories = styled.div`
  display: flex;
  height: 30vh;
  margin-bottom: 5vh;
  margin-top: 5vh;

  @media (max-width: 1200px) {
    /* ... */
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    height: 20vh;
  }
`;

const HeaderList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;

  @media (max-width: 1200px) {
    /* ... */
  }

  @media (max-width: 1024px) {
    /* width: 100%; */
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Category = styled.button`
  /* flex: 1; */
  text-align: center;
  font-size: 1rem;
  padding: 12px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
  background: lightgrey;
  color: black;
  transition: all ease-in 0.4s;
  border: 2px solid transparent;

  &:hover {
    color: blue;
    transform: scale(1.3);
  }

  & ${StyledLink} {
    font-size: 22px;
  }
`;
const FeaturedTitle = styled.div`
  font-size: 30px;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid lightgrey;
  margin: 10px 65px 30px 65px;
`;
const Featured = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const Product = styled.div`
  width: 200px;
  box-shadow: 5px 5px 15px 5px #000000;
  margin-top: 30px;
  padding: 20px;
  transition: all ease-in 0.4s;
  &:hover {
    transform: scale(1.2);
  }
`;

const Image = styled.img`
  text-align: center;
  width: 100px;
  height: 100px;
  margin-bottom: 5px;
`;
const Name = styled.div`
  text-align: center;
  align-items: center;
  font-weight: bold;
`;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;
export default HomePage;
