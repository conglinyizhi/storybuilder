import './style.css'
import $ from 'jquery';

$(() => {

  const inputDiv = document.getElementById('input');
  const spanElement = document.querySelector('#input span');

  $('#input').on('keydown', (event) => {
    if (event.key === 'Enter') {
      addTagButton();
      return false;
    }
    console.log(event.key);
  });

  const addTagButton = () => {
    const spaceElement = $('<span> </span>');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const newSpan = $('<span>').addClass('tag').text(`新标签 - ${++tagid}`).attr('contentEditable', false);
    range.insertNode(spaceElement[0]);
    range.insertNode(newSpan[0]);
    range.insertNode(spaceElement[0]);
    range.setStartAfter(newSpan[0]);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

});