import Error from 'next/error'

export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = { openPodcast: null }
    }

    static async getInitialProps({ query, res }) {
        let idChannel = query.id

        try {
            let [reqChannel, reqAudio, reqSeries] = await Promise.all([
                fetch(`https://api.audioboom.com/channels/${idChannel}`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
            ])

            if( reqChannel.status >= 404 ){
                res.statusCode = reqChannel.status
                return { channel: null, audioClips:null, series: null, statusCode: reqChannel.status}
            }
    
            let dataChannel = await reqChannel.json()
            let channel = dataChannel.body.channel
    
            let dataAudios = await reqAudio.json()
            let audioClips = dataAudios.body.audio_clips
    
            let dataSeries = await reqSeries.json()
            let series = dataSeries.body.channels
    
            return { channel, audioClips, series, statusCode: 200 }
        } catch (e) {
            return { channel: null, audioClips:null, series: null, statusCode: 503}
        }
    }

    openPodcast = (event, podcast) => {
        event.preventDefault()
        this.setState({
            openPodcast: podcast
        })
    }

    render() {
        const { channel, audioClips, series, statusCode } = this.props
        const { openPodcast } = this.state

        if( statusCode !== 200 ){
            return <Error statusCode={ statusCode } />
        }

        return (
        <div>
            <header>Podcasts</header>

            { openPodcast && <div>Hay un podcaste abierto</div> }


             <h1>{ channel.title }</h1>

            <h2>Series</h2>
            {
                series.map((serie) => (
                    <div>{ serie.title }</div>
                ))
            }

            <h2>Ultimos Podcasts</h2>
            {
                audioClips.map((clip) => (
                    <div>{ clip.title }</div>
                ))
            }



            <style jsx>{`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }
                    .channels{
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    }
                    .channel {
                        display: block;
                        border-radius: 3px;
                        box-shadow: 0px 2px 6px rbga(0,0,0,0.15);
                        margin-bottom: 0.5em;
                    }
                    .channel img {
                        width: 100%;
                    }
                    h1 {
                        font-weight: 600;
                        padding: 15px;
                    }
                    h2 {
                        padding: 5px;
                        font-size: 0.9em;
                        font-weight: 600;
                        margin: 0;
                        text-align: center;
                    }
                `}</style>

                <style jsx global>{`
                    body {
                        margin: 0;
                        font-family: system-ui;
                        background: white;
                    }
                `}</style>
        </div>
    )
    }
}