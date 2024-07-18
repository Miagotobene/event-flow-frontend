import ctaImage from '../assets/images/emsHolding.png'

const CallToAction = () => {

    return (
        <section className="cta">
            <div className="cta__container">
                <img src={ctaImage} className='cta__image' />
                <div className='cta__content'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In tenetur dignissimos non, debitis ipsum veritatis deleniti incidunt hic cupiditate facere.
                        Porro ad quo libero vero!</p>
                    <button> Click me</button>
                </div>


            </div>

        </section>
    )
}

export default CallToAction;