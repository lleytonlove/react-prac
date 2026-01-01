import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const [detail, setDetail] = useState({}); // 초기값을 null로 하면 로딩 상태 관리가 더 명확합니다.
    const [loading, setLoading] = useState(true); // 로딩 상태를 추가합니다.

    const { id } = useParams();

    useEffect(() => {
        // getMovie 함수를 useEffect 내부로 이동시킵니다.
        const getMovie = async () => {
            const json = await (
                await fetch(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
            setDetail(json?.data?.movie || {});
            setLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 변경합니다.
        }
        getMovie();
    }, [id]); // id가 변경될 때마다 useEffect를 다시 실행하도록 의존성 배열에 id를 추가합니다.

    return (
        <div>
            {loading ? ( // 로딩 중일 때 로딩 메시지를 표시합니다.
                <h1>Loading...</h1>
            ) : (
                <div key={detail.id}>
                    <h2>{detail.title}</h2>
                    <img src={detail.medium_cover_image} alt={`${detail.title} imag`} />
                    <p>{detail.summary}</p>
                    <ul>
                        {/* detail.genres가 존재할 때만 map 함수를 사용하도록 조건부 렌더링을 추가합니다. */}
                        {detail.genres && detail.genres.map((g, index) => <li key={index}>{g}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Detail;
