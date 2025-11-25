import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f8f7f7"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="290" rx="6" ry="6" width="261" height="21" />
        <rect x="-2" y="324" rx="10" ry="10" width="264" height="117" />
        <rect x="-1" y="462" rx="10" ry="10" width="90" height="26" />
        <rect x="136" y="454" rx="18" ry="18" width="129" height="44" />
        <rect x="0" y="18" rx="14" ry="14" width="262" height="260" />
    </ContentLoader>
)

export default Skeleton;