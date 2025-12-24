export default function VideoCard({ item }) {
    return (
        <div>
            <strong>{item.title}</strong>
            <p>{item.source}</p>
        </div>
    );
}