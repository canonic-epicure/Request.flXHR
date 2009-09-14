use Module::Build::JSAN::Installable;

my $build = Module::Build::JSAN::Installable->new(

	module_name    => 'Request.flXHR',
	create_makefile_pl => 'passthrough',
	dist_version   => 0.01,
	dist_author   => 'SamuraiJack',
	dist_abstract  => "JSAN wrapper for flXHR project",
	license        => 'perl',
);

$build->create_build_script;

