export const formatRupiah = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID');
export const finalPrice = (price: number, discount?: number) => (discount ? price * (1 - discount / 100) : price);
