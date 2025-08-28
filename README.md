Requisitos:

Para rodar o projeto é necessário configurar o serverest e o cypress;
Abrir dois terminais no vs code;
No primeiro rodar o comando: "npx serverest@latest"
No segundo rodar o comando: "npx cypress open" para abrir o cypress ou "npx cypress run" para rodar o projeto

Ao final da execução será gerado um arquivo de evidências no caminho "reports > html > index.html" do projeto

Ao realizar alterações e subir para o repositório o mesmo rodará pipelines que ao final da execução exibirá os resultados da execução.
