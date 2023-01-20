import { Link, useNavigate } from 'react-router-dom';
import './card.css';
import SpritleLogo from "../assets/spritle_logo.png"
import voteicon from "../assets/voteicon.jpg"

function Card({ questions }: { questions: { ques: string, date: string, vote: number }[] }) {
   const navigate = useNavigate();
   console.log("(*****************)")

   const handleclick = (index: number) => {
      console.log(index, "index")
      navigate('/pole', { state: { id: index } });

   }
   return (

      <div className="container mt-5 mb-3">

         <div className="row">
            {
               questions.map((element, index) => {
                  return (
                     <div className='col-lg-4'>
                        <div className="card p-3 mb-2" onClick={() => { handleclick(index) }}  >
                           <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                 <div  > <img className='voteicon' src={voteicon} /></div>
                                 <div className="ms-2 c-details">
                                    <h6 className="mb-0"></h6> <span>{element.date}</span>

                                 </div>
                              </div>
                           </div>
                           <div className="mt-5">   <h3 className="heading">{element.ques}</h3>

                              <div className="mt-5">
                                 <progress id="file" value={element.vote} max="100"></progress>
                                 <div className="mt-3"> <span className="text1">{element.vote} Applied <span className="text2">of 100 capacity</span></span> </div>
                              </div>
                           </div>
                        </div>
                     </div>

                  )
               }
               )
            }

         </div>
      </div>

   )

}
export default Card