export default class extends React.Component{
    render() {
        return <div>
                <h1>hola mundo</h1>
                <p>hey</p>

                <img src="/static/cam1.jpeg"/>

                <style jsx>{`
                    h1 {
                        color: red;
                    }
                    :global(p){
                        color: green;
                    }
                    div:global(p){
                        color: green;
                    }
                    :global(div p){
                        color: green;
                    }

                    img {
                        max-width: 50%;
                        display: block;
                        margin : 0 auto;
                    }
                    
                `}</style>

                <style jsx global>{`
                    body {
                        background: yellow;
                    }
                `}</style>
            </div>
    }
}