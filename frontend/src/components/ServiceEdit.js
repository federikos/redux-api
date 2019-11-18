import React, {useRef} from 'react'
import {useHistory} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, saveService } from '../actions/actionCreators';

function ServiceEdit() {
  const {item, loading, loadingSave, error} = useSelector(state => state.serviceEdit);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeRef = useRef(evt => {
    const {name, value} = evt.target;
    dispatch(changeServiceField(name, value));
  });

  const handleSubmitRef = useRef((evt, item) => {
    evt.preventDefault();
    dispatch(saveService(item, history));
  });

  const handleCancelRef = useRef(evt => {
    evt.preventDefault();
    history.go(-1);
  });

  return (
    <form className="form" onSubmit={e => handleSubmitRef.current(e, item)}>
      <div className="input-group">
        <label htmlFor="name">Название</label>
        <input id="name" name='name' disabled={loading || loadingSave} onChange={handleChangeRef.current} value={item.name} />
      </div>
      <div className="input-group">
        <label htmlFor="price">Цена</label>
        <input id="price" name='price' disabled={loading || loadingSave} onChange={handleChangeRef.current} value={item.price} />
      </div>
      <div className="input-group">
        <label htmlFor="content">Описание</label>
        <input id="content" name='content' disabled={loading || loadingSave} onChange={handleChangeRef.current} value={item.content} />
      </div>
      <div className="btns">
        <button type='button' disabled={loading || loadingSave} onClick={handleCancelRef.current}>Отмена</button>
        {
          loadingSave
          ? <button type="button"><ClipLoader size={10} /></button>
          : <button type='submit' disabled={loading}>Сохранить</button>
        }
      </div>
      {error && <p className="error">Произошла ошибка!</p>}
    </form>
  );
}

export default ServiceEdit;
