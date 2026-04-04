describe('Markdown App E2E Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.visit('/');
  });

  it('should load the app with sample text', () => {
    cy.get('textarea').should('contain.value', '# Titre');
    cy.get('.col-sm-6 div').should('contain.html', '<h1>Titre</h1>\n<h2>Sous-titre</h2>\n<p>Ceci est un paragraphe avec du <strong>texte en gras</strong> et du <em>texte en italique</em>.</p>\n<ul>\n<li>Élément de liste 1</li>\n<li>Élément de liste 2</li>\n<li>Élément de liste 3</li>\n</ul>\n<p><a href="https://www.openai.com">Un lien vers OpenAI</a></p>\n<pre><code class="language-javascript">// Exemple de code JavaScript\nfunction saluer(nom) {\n    return `Bonjour, ${nom} !`;\n}\nconsole.log(saluer("Monde"));\n</code></pre>\n');
  });

  it('should render markdown correctly when typing', () => {
    const markdownText = '# Hello World\n\nThis is **bold** and *italic*.';
    cy.get('textarea').clear().type(markdownText);
    cy.get('.col-sm-6 div').should('contain.html', '<h1>Hello World</h1>\n<p>This is <strong>bold</strong> and <em>italic</em>.</p>\n');
  });

  it('should persist text in localStorage', () => {
    const customText = '## Custom Title\n\nSome content.';
    cy.get('textarea').clear().type(customText);
    cy.reload();
    cy.get('textarea').should('have.value', customText);
    cy.get('.col-sm-6 div').should('contain.html', '<h2>Custom Title</h2>\n<p>Some content.</p>\n');
  });

  it('should handle code blocks', () => {
    const codeText = '```\nconsole.log("Hello");\n```';
    cy.get('textarea').clear().type(codeText);
    cy.get('.col-sm-6 div').should('contain.html', '<pre><code>console.log("Hello");\n</code></pre>');
  });

  it('should handle links', () => {
    const linkText = '[Google](https://google.com)';
    cy.get('textarea').clear().type(linkText);
    cy.get('.col-sm-6 div').should('contain.html', '<p><a href="https://google.com">Google</a></p>');
  });
});