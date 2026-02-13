import "./Homepage.css"
import imgone from "../../public/Images/one.jpg"
import imgtwo from "../../public/Images/two.jpg"
import imgthree from "../../public/Images/three.jpg"
import imgfor from "../../public/Images/for.jpeg"
import imgfive from "../../public/Images/five.jpeg"

function HomePage() {
  return (
    <div>

      <div className="background">
        <img src={imgfive} alt="" className="src-img" />
        <div className="overlay">



        </div>

        <div className="blog-rider blog-rider-div">
          <h1 className="blog-rider-text">
            {"PERSONAL-BLOG" .split("").map((char, index) => (
              <span key={index} className="letter">{char}</span>
            ))}
          </h1>

          <h5 className="text-light phrase">
            &quot;{"Your story is the spark. Someone out there needs that light" .split("").map((char, index) => (
              <span key={index} className="letter">{char}</span>
              
            ))}&quot;
          </h5>

          
        </div>
      </div>




    </div>





  )
}

export default HomePage
