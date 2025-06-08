export const LineLoader = ({size}:{size?: 'large' | 'medium' | 'small'}) => {
    return (
        
            <div className={`loader-body loader-body-size-${size}`}>
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
     
        
    )
}
