module.exports = {
  'Checks if widget creation works properly': function(browser) {

    var demoEmail = process.env.DEMO_USER_EMAIL || 'demo.widget@click2vox.com';
    var demoPassword = 'password';

    browser
      .url(browser.launchUrl + '/login') // first we need to log in
      .waitForElementVisible('body', 1000)

      // then we need to input the values
      .assert.visible('input[name="uemail"]')
      .assert.visible('input[name="upassword"]')
      .setValue('input[name="uemail"]', demoEmail)
      .setValue('input[name="upassword"]', demoPassword)
      .click('button#login')

      // NOTE: we need to make sure that env var
      // BYPASS_ADDING_SIP_URI is equal to 'false'
      // otherwise the bahaviour here would be different

      // this should take us to the "Add new sip uri" screen
      .pause(2000)
      .assert.containsText('body', 'Add a new SIP Address')
      .click('button.skip-sip')

      // now we should be in "create new Button" screen
      .pause(2000)
      .assert.containsText('body', 'Create a WebRTC Click-to-Call Button')

      // time to fill the form and save the button
      .end();
  }
};