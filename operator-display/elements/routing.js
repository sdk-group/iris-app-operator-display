'use strict';

window.addEventListener('WebComponentsReady', function () {

  var is_crosswalk = ~navigator.userAgent.indexOf('Crosswalk');
  //
  if (!localStorage.is_dev && !is_crosswalk) {
    page.base(app.baseUrl.replace(/\/$/, ''));
  }

  var settings = new IRIS.settings();

  setTimeout(function () {
    var id = settings.getItem('operator_arm_id');
    if (!!id) return;

    page.redirect('/settings');
  }, 1500);

  function checkSettings(ctx, next) {
    var id = settings.getItem('operator_arm_id');

    if (!id) {
      page.redirect('/settings');
      return;
    }
    next();
  }

  page('/', checkSettings, function () {
    app.route = 'display';
  });

  page('/settings', function () {
    console.log("SETTINGS");
    app.route = 'settings';
  });

  page('/restart', function () {
    app.restart_dialog = true;
    if (is_crosswalk) {
      location.href = "file:///android_asset/www/index.html";
    } else {
      page.redirect('/');
      setTimeout(function () {
        window.location.reload();
      }, 300);
    }
  });

  page(app.baseUrl, checkSettings, function () {
    app.route = 'display';
  });

  // 404
  page('*', function () {
    // app.$.toast.text = 'Страница не найдена: ' + window.location.href + '.'; app.$.toast.show();
    page.redirect(app.baseUrl);
  });

  // add #! before urls
  page({ hashbang: true });
});