const handleSearch = async (evt) => {
    // CANCELA A AÇÃO DO BOTÃO
    evt.preventDefault();
  
    // OBTÉM ELEMENTO DE TELA
    const messageBox = document.getElementById("message");
    const showList = document.getElementById("shows");
  
    // LIMPAR LISTA E A MENSAGEM
    messageBox.innerHTML = "";
    showList.innerHTML = "";
  
    // OBTENDO O VALOR DIGITADO
    const textToSearch = document.getElementById("query").value;
  
    // MONTANDO A URL DA API
    const url = `https://api.tvmaze.com/search/shows?q=${textToSearch}`;
  
    // CHAMAR A API
    const response = await fetch(url);
  
    // TESTAR SE NÃO TEVE SUCESSO
    if (!response.ok) {
      messageBox.innerHTML = "Failed do fetch results.";
      return;
    }
  
    // LER O RESULTADO
    const showsFetched = await response.json();
  
    // SABER SE NÃO VEIO NENHUM SHOW
    if (showsFetched.length === 0) {
      messageBox.innerHTML = "Not found.";
      return;
    }
  
    // EXIBIR OS SHOWS RETORNADOS
    showsFetched.forEach((item) => {
      const showName = item?.show?.name;
      const showPictureUrl = item?.show?.image?.medium || '';
  
      // EXIBIR O NOME E A IMAGEM
      showList.insertAdjacentHTML("beforeend", `
        <li>
          <img class="poster" src="${showPictureUrl}" />
          <span class="show-name">${showName}</span>
        </li>
      `);
    });
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelector('#search-form')
      .addEventListener('submit', handleSearch);
  });