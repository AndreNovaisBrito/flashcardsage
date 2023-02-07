import "./Header.css"

export function Header(){
    return (
    <div className="Header">
        <div className='container'>
            <div>
                <a href={"/"}>FlashCardSage</a>
            </div>
            <div>
                <a href={"/decks"}>Decks</a>
                </div>
            <div>
                <a href={"/login"}>LOGIN</a>
            </div>
        </div>
    </div>
    );
}