import ProgressBar from "../components/ProgressBar"

interface Props {
    progress: number
}

function loading({ progress }: Props) {
    return (
        <section className="container h-screen">
            <div className="flex flex-col justify-center items-center h-full">
                <img src="/logo.png" alt="WARTHOG NETWORK" height={155} width={155} />
                <ProgressBar progress={progress} />
            </div>
        </section>
    )
}
export default loading