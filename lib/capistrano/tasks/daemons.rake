namespace :daemons do

  desc "Run hello world service."
  task :run_hello_world do
    on roles(:app) do
      execute "cd #{current_path}&&node service.js"
      # execute "pwd"
      # execute "npm install"
      # execute "node service.js"
    end
  end

end