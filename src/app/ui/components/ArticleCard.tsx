export default function ArticleCard({ item }) {
    return (
        <div>
            <strong>{item.title}</strong>
            <p>{item.source}</p>
        </div>
    );
}