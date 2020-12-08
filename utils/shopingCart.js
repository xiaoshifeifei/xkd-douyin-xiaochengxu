export function allChecked(e, cart) {
  cart.allChecked = !cart.allChecked;

  if (cart.allChecked) {
    cart.goodsList.forEach(item => item.checked = true);
  } else {
    cart.goodsList.forEach(item => item.checked = false);
  }

  return cart;
}
export function select() {}