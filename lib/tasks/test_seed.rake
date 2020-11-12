namespace :db do
  task :test_seed => :environment do
    Rails.env = 'test'
    Rake::Task["db:seed"].execute
  end
end

