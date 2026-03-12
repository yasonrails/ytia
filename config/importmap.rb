# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "theme_particles",  to: "theme_particles.js"
pin "interactions",     to: "interactions.js"
pin "cookie_banner",    to: "cookie_banner.js"
