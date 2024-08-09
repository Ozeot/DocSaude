const documents = [
    // Documentos
    { category: "Documentos", title: "Documento 1", url: "https://www.mediafire.com/file/documento1.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Documentos", title: "Documento 2", url: "https://www.mediafire.com/file/documento2.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Documentos", title: "Documento 3", url: "https://www.mediafire.com/file/documento3.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Documentos", title: "Documento 4", url: "https://www.mediafire.com/file/documento4.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Documentos", title: "Documento 5", url: "https://www.mediafire.com/file/documento5.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Documentos", title: "Documento 6", url: "https://www.mediafire.com/file/documento6.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Documentos", title: "Documento 7", url: "https://www.mediafire.com/file/documento7.pdf/file", thumbnail: "Icon/doc.png" },

    // Prontuário
    { category: "Prontuário", title: "Prontuário 1", url: "https://www.mediafire.com/file/prontuario1.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Prontuário", title: "Prontuário 2", url: "https://www.mediafire.com/file/prontuario2.pdf/file", thumbnail: "Icon/doc.png" },

    // Atestado
    { category: "Atestado", title: "Atestado 1", url: "https://www.mediafire.com/file/atestado1.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Atestado", title: "Atestado 2", url: "https://www.mediafire.com/file/atestado2.pdf/file", thumbnail: "Icon/doc.png" },

    // Receituário
    { category: "Receituário", title: "Receituário 1", url: "https://www.mediafire.com/file/receituario1.pdf/file", thumbnail: "Icon/doc.png" },
    { category: "Receituário", title: "Receituário 2", url: "https://www.mediafire.com/file/receituario2.pdf/file", thumbnail: "Icon/doc.png" },

    // AIH
    { category: "AIH", title: "AIH", url: "https://drive.google.com/file/d/1evnwtewpd9mz4aywuhaUf_2p636O63vw/preview", thumbnail: "Icon/doc.png" },
    { category: "AIH", title: "AIH 2", url: "https://www.mediafire.com/file/iah2.pdf/file", thumbnail: "Icon/doc.png" }
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

    // Modifica URL para visualização no Google Drive se necessário
    const viewUrl = doc.url.includes('drive.google.com') ? doc.url.replace('/view?usp=sharing', '/preview') : doc.url;
    
    previewFrame.src = viewUrl;

    downloadButton.onclick = function() {
        const fileId = doc.url.match(/\/d\/(.+?)\//)?.[1];
        if (fileId) {
            const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${doc.title}.pdf`; // Define o nome do arquivo para download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Não foi possível gerar o link de download.');
        }
    };

    previewModal.style.display = 'block';
    overlay.style.display = 'block';
    previewModal.focus(); // Foco no modal para acessibilidade
}

function closePreview() {
    const previewModal = document.getElementById('previewModal');
    const overlay = document.getElementById('overlay');

    previewModal.style.display = 'none';
    overlay.style.display = 'none';
}

// Certifique-se de que o modal não está visível quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const previewModal = document.getElementById('previewModal');
    previewModal.style.display = 'none';

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

function searchDocuments() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(input)
    );

    loadDocuments(filteredDocuments); // Carrega documentos filtrados
}

function filterByCategory(category) {
    if (category === "Todos") {
        loadDocuments(documents); // Mostra todos os documentos
    } else {
        const filteredDocuments = documents.filter(doc => doc.category === category);
        loadDocuments(filteredDocuments);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadDocuments(documents);

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchDocuments);

    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.textContent;
            filterByCategory(category);
            document.querySelectorAll('.navbar-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePreview();
        }
    });
});
