export default function App() {
  return (
    <div>
      <button class="snipcart-customer-signin">My account</button>
      <br />
      <br />
      <table>
        <tr>
          <td>1</td>
          <td name="id">Sneaker</td>
          <td>100</td>
          <td>
            <button
              class="snipcart-add-item"
              data-item-id="Sneaker"
              data-item-price="100"
              data-item-url="as"
              data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
              data-item-name="Sneaker"
            >
              Buy
            </button>
          </td>
        </tr>

        <tr>
          <td>2</td>
          <td name="id">Flip Flop</td>
          <td>123</td>
          <td>
            <button
              class="snipcart-add-item"
              data-item-id="Flip-Flop"
              data-item-price="123"
              data-item-url="asd"
              data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
              data-item-name="Flip-Flop"
            >
              Buy
            </button>
          </td>
        </tr>

        <tr>
          <td>3</td>
          <td name="id">Bata-chappal</td>
          <td>320</td>
          <td>
            <button
              class="snipcart-add-item"
              data-item-id="Bata-chappal"
              data-item-price="320"
              data-item-url="sad"
              data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
              data-item-name="Bata chappal"
            >
              Buy
            </button>
          </td>
        </tr>

        <tr>
          <td>4</td>
          <td name="id">Puma-Sandals</td>
          <td>120</td>
          <td>
            <button
              class="snipcart-add-item"
              data-item-id="Puma-Sandals"
              data-item-price="120"
              data-item-url="234234"
              data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
              data-item-name="Puma Sandals"
            >
              Buy
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
