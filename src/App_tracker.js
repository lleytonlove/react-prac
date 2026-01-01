import { useState, useEffect, useMemo } from "react";

// git push
function App() {
  const [loading, setLoading] = useState(true);
  const [bitList, setBitList] = useState([]);
  const [seed, setSeed] = useState(0);
  const [selectedCoinId, setSelectedCoinId] = useState(null);

  // selectedCoinId가 변경될 때 bitList에서 해당 코인 정보를 찾아 메모이제이션합니다.
  const selectedCoin = useMemo(() => {
    if (!selectedCoinId) return null;
    return bitList.find(coin => coin.id === selectedCoinId);
  }, [selectedCoinId, bitList]);

  // seed나 selectedCoin이 변경될 때만 계산 결과를 다시 만듭니다.
  const resultText = useMemo(() => {
    const price = selectedCoin?.quotes.USD.price;
    if (seed > 0 && price > 0) {
      const amount = seed / price;
      return `You can buy ${amount.toFixed(6)} ${selectedCoin.symbol} for $${parseFloat(seed).toFixed(2)}`;
    }
    return "Please enter seed amount and select a coin.";
  }, [seed, selectedCoin]);

  const onSeedChange = (event) => setSeed(event.target.value);

  // select의 onChange 핸들러는 코인의 id를 받아 상태를 업데이트합니다.
  const onCoinChange = (event) => {
    setSelectedCoinId(event.target.value);
  };

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers', { method: 'GET' })
      .then(res => res.json())
      .then((json) => {
        setBitList(json);
        // API 호출 후 첫 번째 코인의 id로 상태를 초기화합니다.
        if (json.length > 0) {
          setSelectedCoinId(json[0].id);
        }
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>The Coins !! {loading ? "" : `(${bitList.length})`}</h1>
      {loading ?
        <strong>Loading...</strong>
        :
        <div>
          {/* select의 value에는 선택된 코인의 id를 사용합니다. */}
          <select onChange={onCoinChange} value={selectedCoinId || ''}>
            {bitList.map((coin) => (
              // option의 value에는 코인의 고유 id만 저장합니다.
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <br />
          <input type="number" onChange={onSeedChange} value={seed} placeholder="input seed amount" />
          {/* useMemo로 계산된 결과 텍스트를 렌더링합니다. */}
          <span>{resultText}</span>
        </div>
      }
    </div>
  );
}

export default App;
