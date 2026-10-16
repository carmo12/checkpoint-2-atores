// Para adicionar alguém, copie um bloco e preencha.
// "foto" é opcional: sem foto (ou se o link quebrar), o card mostra as iniciais.
const atores = [
    {
        nome: "Tom Hanks", pais: "Estados Unidos", nascimento: "09/07/1956",
        destaque: "Forrest Gump",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-Ut9IgmfllDrebHVgK357OcB19CtTZrU8p8DIYBLSboBF2LWMvi8ih00UMSby-XJqLILtMlXCX8JV8ooOCmMVwAmrSOaLjmk5JaGK3ZV8A&s=10"
    },
    {
        nome: "Scarlett Johansson", pais: "Estados Unidos", nascimento: "22/11/1984",
        destaque: "Encontros e Desencontros",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9m_WCzJhzhNzCWgchNBKFDv5sWe0qNDaWnkVTP41Ss82sKIAy_8lgHZPLCYk0-Ua-MWm5rhikoBd5Z_8dhuncZrnOV3miYOcHJPqP2AYNQg&s=10"
    },
    {
        nome: "Leonardo DiCaprio", pais: "Estados Unidos", nascimento: "11/11/1974",
        destaque: "O Lobo de Wall Street",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPQ899PgoDdGuctdulkeX6st7ID8v8GU1USYxncIqCuf3qJJqWm_ZBzPHUTG98Fl9bJlIqn77Q1O3R_Gd7yDLxmtHket2jXeU61m8SruHUBg&s=10"
    },
    { nome: "Meryl Streep", pais: "Estados Unidos", nascimento: "22/06/1949", destaque: "O Diabo Veste Prada" },
    { nome: "Denzel Washington", pais: "Estados Unidos", nascimento: "28/12/1954", destaque: "Dia de Treinamento" },
    { nome: "Brad Pitt", pais: "Estados Unidos", nascimento: "18/12/1963", destaque: "Clube da Luta" },
    { nome: "Viola Davis", pais: "Estados Unidos", nascimento: "11/08/1965", destaque: "Histórias Cruzadas" },
    { nome: "Morgan Freeman", pais: "Estados Unidos", nascimento: "01/06/1937", destaque: "Um Sonho de Liberdade" },
    { nome: "Fernanda Montenegro", pais: "Brasil", nascimento: "16/10/1929", destaque: "Central do Brasil" },
    { nome: "Fernanda Torres", pais: "Brasil", nascimento: "15/09/1965", destaque: "Ainda Estou Aqui" },
    { nome: "Wagner Moura", pais: "Brasil", nascimento: "27/06/1976", destaque: "Tropa de Elite" },
    { nome: "Rodrigo Santoro", pais: "Brasil", nascimento: "22/08/1975", destaque: "Hoje Eu Quero Voltar Sozinho" },
    { nome: "Sônia Braga", pais: "Brasil", nascimento: "08/06/1950", destaque: "Dona Flor e Seus Dois Maridos" },
    { nome: "Anthony Hopkins", pais: "Reino Unido", nascimento: "31/12/1937", destaque: "O Silêncio dos Inocentes" },
    { nome: "Emma Watson", pais: "Reino Unido", nascimento: "15/04/1990", destaque: "Harry Potter" },
    { nome: "Cate Blanchett", pais: "Austrália", nascimento: "14/05/1969", destaque: "Blue Jasmine" },
    { nome: "Hugh Jackman", pais: "Austrália", nascimento: "12/10/1968", destaque: "Wolverine" },
    { nome: "Marion Cotillard", pais: "França", nascimento: "30/09/1975", destaque: "Piaf: Um Hino ao Amor" },
    { nome: "Penélope Cruz", pais: "Espanha", nascimento: "28/04/1974", destaque: "Volver" },
    { nome: "Natalie Portman", pais: "Israel", nascimento: "09/06/1981", destaque: "Cisne Negro" },
    { nome: "Gael García Bernal", pais: "México", nascimento: "30/11/1978", destaque: "Y Tu Mamá También" },
    { nome: "Ken Watanabe", pais: "Japão", nascimento: "21/10/1959", destaque: "O Último Samurai" }
];