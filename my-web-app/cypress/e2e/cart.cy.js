describe('Shopping Cart Test', () => {
  beforeEach(() => {
    // Вэб сайт руугаа зочилно
    cy.visit('http://localhost:3000');
  });

  it('Should add an item to the cart', () => {
    // 1. "Add to Cart" товчийг олно (Класс эсвэл текстээр нь)
    cy.contains('Add to Cart').first().click();

    // 2. Сагсны тоо нэмэгдсэн эсэхийг шалгана
    // (Энд өөрийнхөө сагсны класс нэрийг .cart-count оронд бичээрэй)
    cy.get('.cart-count').should('not.contain', '0');
  });

  it('Should remove an item from the cart', () => {
    // 1. Эхлээд бараа нэмнэ
    cy.contains('Add to Cart').first().click();

    // 2. Сагсны хуудас руу орно
    cy.get('a[href="/cart"]').click();

    // 3. Устгах товчийг дарна
    cy.get('.delete-btn').first().click();

    // 4. Бараа устсан эсэхийг шалгана
    cy.get('.cart-item').should('not.exist');
  });
});