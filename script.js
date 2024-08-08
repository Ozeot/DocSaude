const documents = [
    // Documentos
    {
        category: "Documentos",
        title: "Documento 1",
        url: "https://www.mediafire.com/file/documento1.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },
    {
        category: "Documentos",
        title: "Documento 2",
        url: "https://www.mediafire.com/file/documento2.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },

    // Prontuário
    {
        category: "Prontuário",
        title: "Prontuário 1",
        url: "https://www.mediafire.com/file/prontuario1.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },
    {
        category: "Prontuário",
        title: "Prontuário 2",
        url: "https://www.mediafire.com/file/prontuario2.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },

    // Atestado
    {
        category: "Atestado",
        title: "Atestado 1",
        url: "https://www.mediafire.com/file/atestado1.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },
    {
        category: "Atestado",
        title: "Atestado 2",
        url: "https://www.mediafire.com/file/atestado2.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },

    // Receituário
    {
        category: "Receituário",
        title: "Receituário 1",
        url: "https://www.mediafire.com/file/receituario1.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },
    {
        category: "Receituário",
        title: "Receituário 2",
        url: "https://www.mediafire.com/file/receituario2.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    },

    // AIH
    {
        category: "AIH",
        title: "AIH",
        url: "https://drive.google.com/file/d/1evnwtewpd9mz4aywuhaUf_2p636O63vw/preview",
        thumbnail: "https://via.placeholder.com/100"
    },
    {
        category: "AIH",
        title: "AIH 2",
        url: "https://www.mediafire.com/file/iah2.pdf/file",
        thumbnail: "https://via.placeholder.com/100"
    }
];

function loadDocuments(documentArray) {
    const documentList = document.getElementById('documentList');
    documentList.innerHTML = ''; // Limpa a lista atual

    documentArray.forEach(doc => {
        const listItem = document.createElement('li');
        listItem.className = 'document-item';

        const thumbnail = document.createElement('img');
        thumbnail.src = doc.thumbnail;
        thumbnail.className = 'document-thumbnail';

        const title = document.createElement('div');
        title.className = 'document-title';
        title.textContent = doc.title;

        const viewButton = document.createElement('button');
        viewButton.className = 'view-button';
        viewButton.textContent = 'Visualizar';
        viewButton.addEventListener('click', () => openPreview(doc));

        listItem.appendChild(thumbnail);
        listItem.appendChild(title);
        listItem.appendChild(viewButton);

        documentList.appendChild(listItem);
    });
}

function openPreview(doc) {
    const previewModal = document.getElementById('previewModal');
    const previewFrame = document.getElementById('previewFrame');
    const downloadButton = document.getElementById('downloadButton');
    const overlay = document.getElementById('overlay');

    // Transformar o URL do Google Drive para visualização
    const viewUrl = doc.url.replace('/view?usp=sharing', '/preview');
    
    // Configura o iframe para exibir o documento PDF
    previewFrame.src = viewUrl;

    // Configura o botão de download para baixar o PDF ao clicar
    downloadButton.onclick = function() {
        const fileId = doc.url.match(/\/d\/(.+?)\//)[1];
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = doc.title + '.pdf'; // Define o nome do arquivo para download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Exibe o modal de pré-visualização e a sobreposição
    previewModal.style.display = 'block';
    overlay.style.display = 'block';
}

function closePreview() {
    const previewModal = document.getElementById('previewModal');
    const overlay = document.getElementById('overlay');

    // Esconde o modal de pré-visualização e a sobreposição
    previewModal.style.display = 'none';
    overlay.style.display = 'none';
}

// Função para filtrar documentos com base no texto de pesquisa
function searchDocuments() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(input)
    );

    loadDocuments(filteredDocuments); // Carrega documentos filtrados
}

// Função para filtrar documentos por categoria
function filterByCategory(category) {
    if (category === "Todos") {
        loadDocuments(documents); // Mostra todos os documentos
    } else {
        const filteredDocuments = documents.filter(doc => doc.category === category);
        loadDocuments(filteredDocuments);
    }
}

// Carrega todos os documentos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadDocuments(documents);
 
    // Event listener para o botão de pesquisa
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', searchDocuments);

    // Event listener para o input de pesquisa com 'Enter'
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            searchDocuments();
        }
    });

    // Event listeners para os links de categoria
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.textContent;
            filterByCategory(category);
            document.querySelectorAll('.navbar-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
