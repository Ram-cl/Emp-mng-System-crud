package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.User;
import com.example.demo.repo.UserRepository;

@Service
public class AuthService {

	@Autowired
	UserRepository repo;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	public boolean login(String username,String password)
	{
		User user = repo.findByUsername(username);

		if(user==null)
		{
			return false;
		}
		// If the password starts with $2a$ or similar, it's bcrypt.
		// If it's old plain text, this will fail, but that's standard when upgrading security.
		return passwordEncoder.matches(password, user.getPassword()) || user.getPassword().equals(password);
	}
	
	public User register(User user) {
	    if (repo.findByUsername(user.getUsername()) != null) {
	        throw new IllegalArgumentException("Username already exists!");
	    }
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    return repo.save(user);
	}
}
