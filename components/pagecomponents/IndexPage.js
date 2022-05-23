import React from 'react'
import { Button } from 'react-bootstrap';
import Image from 'next/image'
import lftban from '../../public/images/headban.png'
import btmban from '../../public/images/undraw_Exams_re_4ios.png'
import blogperson from '../../public/images/5484597.png'

export const IndexPage = () => {
  return (
    <div>
    <div>
      <div className="container main-top ">
        <div className="container main-top ">

          <div className="row" >

            <div className="container main-top mt-5">

              <div className="row " >

                <div className="col-md-6 ban-div pt-5 ">
                  <h1 className="ban-h mb-4 ">
                    Welcome to BlogNow.
                  </h1>

                  <p className="fdb-block ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non explicabo nihil exercitationem minima mollitia autem et ducimus laborum eius tenetur optio est, sit, quasi excepturi rem necessitatibus inventore aliquam saepe.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, reiciendis. Maxime eligendi asperiores distinctio mollitia. Distinctio beatae veniam atque? Aliquam provident voluptatem minus, unde atque sint rem quasi ipsa labore?
                  </p>

                  <Button href="/contact" className="ban-btn col-md-3" >

                    Contact Us

                  </Button>
                </div>

                <div className="col-md-6">
                  <Image src={lftban} />
                </div>

              </div>
            </div>


          </div>


        </div>

      </div>
      <section className="fdb-block">
        <div className="container">
          <div className="row text-left align-items-center">
            <div className="col-10 col-sm-6 m-auto m-lg-0 col-lg-4">
            <Image src={blogperson} height={330} width={350}/>
            </div>

            <div className="col-12 col-lg-7 offset-lg-1 pt-4 pt-lg-0">
              <h1>Benefits of Blog writing</h1>
              <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.</p>

              <div className="row mt-5">
                <div className="col-12 col-sm-6">
                  <h3><strong>APA Style.</strong></h3>
                  <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                </div>

                <div className="col-12 col-sm-6 pt-3 pt-sm-0">
                  <h3><strong>Article.</strong></h3>
                  <p className="lead">Right at the coast of the Semantics, a large language ocean. A small river named Duden.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="fdb-block">
        <div className="container">
          <div className="row text-left align-items-center">
            <div className="col-12 col-md-6 col-lg-4">
              <h2>Your Website</h2>
              <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <p className="lead"><a href="https://www.froala.com">Read More</a></p>
            </div>

            <div className="col-12 col-md-6 col-lg-4 pt-4 pt-md-0">
              <h2>Amazing Design</h2>
              <p className="lead">Right at the coast of the Semantics, a large language ocean. A small river named Dude a rge language ocean there live the blind.</p>
              <p className="lead"><a href="https://www.froala.com">Read More</a></p>
            </div>

            <div className="col-12 col-md-8 m-auto m-lg-0 col-lg-4 pt-5 pt-lg-0">
              <Image alt="image" className="img-fluid" src={btmban} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  )
}
export default IndexPage