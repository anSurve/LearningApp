import React from 'react'
import Navbar from '../Components/navbar'; 
import { useNavigate } from "react-router-dom";
import slide1 from '../images/Slid_img1.jpg';
import slide2 from '../images/Slid_img2.jpg';
import slide3 from '../images/Slid_img3.jpg';

function Home(){
    
    const token = sessionStorage.getItem("token");
    const name = sessionStorage.getItem("name");
    const isLoggedIn = (token &&  token !== "" && token !== undefined && name && name !== "" && name !== undefined);
    const navigate = useNavigate();
  
    React.useEffect(() => {
      if (isLoggedIn) {
        navigate('/home');
      }
    });

    const parStyle = {
      backgroundColor: 'white',
      borderRadius: '50px',
      color:'black',
      width: '500px'
    };

    const imgStyle = {
      height: '500px'
    }

    return(
        <div className='text-center'>
        <Navbar/>
        <br/>
        <h2>Welcome to Learning App</h2><br/>
        <center>
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{width:'60%'}}>
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={slide1} alt="First slide" style={imgStyle} />
                <div className="carousel-caption d-none d-md-block">
                    <center>
                  <p style={parStyle} >Photo by&nbsp; 
                  <a href="https://unsplash.com/@sharonmccutcheon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexander Grey</a> on <a href="https://unsplash.com/s/photos/teaching?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                  </p></center>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={slide2} alt="Second slide" style={imgStyle}/>
                <div className="carousel-caption d-none d-md-block">
                    <center>
                    <p style={parStyle} >Photo by&nbsp; 
                    <a href="https://unsplash.com/@sharonmccutcheon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexander Grey</a> on <a href="https://unsplash.com/s/photos/teaching?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                    </p></center>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={slide3} alt="Third slide" style={imgStyle}/>
                <div className="carousel-caption d-none d-md-block">
                    <center>
                    <p style={parStyle} >Photo by&nbsp; 
                    <a href="https://unsplash.com/@sharonmccutcheon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexander Grey</a> on <a href="https://unsplash.com/s/photos/teaching?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                    </p></center>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </center>
        </div>
    );
}
export default Home;