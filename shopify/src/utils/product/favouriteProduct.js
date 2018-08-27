import requester from '../../infrastructure/requester';
import messageHelper from '../messageHelper';

export default (favBtn, setState, props) => {
  if (localStorage.username === 'guest') {
    messageHelper.push('error', 'For add to favourites, please first login.');
    props.history.push('/login');
    return;
  }
  requester.productDetails(props.match.params.id).then(product => {
    let index = product.fav.indexOf(localStorage.username);
    if (index >= 0) {
      product.fav.splice(index, 1);
    } else {
      product.fav.push(localStorage.username);
    }

    requester.editProduct(props.match.params.id, product).then(res => {
      setState(
        {
          favBtn: favBtn === 'favorite' ? 'favorite_border' : 'favorite'
        },
        messageHelper.push('success', `Successfully add ${product.title} to your favourites!`)
      );
    });
  });
};
