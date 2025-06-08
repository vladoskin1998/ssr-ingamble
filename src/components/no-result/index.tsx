import './style.css'
import noresult from '/img/no-results.svg'
export const NoResult = () => {
    return (
        <section className="no-results__main main-no-results">
            <div className="main-no-results__body">
                <div className="main-no-results__content">
                    <div className="main-no-results__image">
                        <img src={noresult} alt="no-results" />
                    </div>
                    <div className="main-no-results__info">
                        <h1 className="main-no-results__title">No results found</h1>
                        <div className="main-no-results__subtitle">
                            Sorry, there are not results for: <span className="main-no-results__subtitle-value">GG Cool epic game</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
