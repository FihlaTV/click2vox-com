module.exports = {
  'First Test' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.title('Voxbone Widget Generator v1.5.0')
      .assert.containsText('body', 'Click2Vox')
      .end();
  }
};
