type Props = {
    session: any;
    onLogout: () => void;
}

const DeviceCard = ({ session, onLogout }: Props) => {

    return (

        <div className="border rounded-lg p-4">

            <h2>{session.device}</h2>

            <p>{session.browser}</p>

            <p>{session.ip}</p>

            <p>{session.lastActive}</p>

            {
                session.current
                ?
                <span>Current Device</span>

                :

                <button onClick={onLogout}>
                    Logout
                </button>
            }

        </div>

    )

}

export default DeviceCard;